# import asyncio
# import websockets
# import json
# from pynput import keyboard
# import threading

# connected_clients = set()
# loop = None

# async def handle_client(websocket, path):
#     connected_clients.add(websocket)
#     try:
#         await websocket.wait_closed()
#     finally:
#         connected_clients.remove(websocket)

# async def broadcast_key_event(key, event_type):
#     if connected_clients:
#         message = json.dumps({"key": key, "type": event_type})
#         await asyncio.gather(*[client.send(message) for client in connected_clients])

# def on_press(key):
#     key_char = key.char if hasattr(key, 'char') else key.name
#     asyncio.run_coroutine_threadsafe(broadcast_key_event(key_char, "keydown"), loop)

# def on_release(key):
#     key_char = key.char if hasattr(key, 'char') else key.name
#     asyncio.run_coroutine_threadsafe(broadcast_key_event(key_char, "keyup"), loop)

# def start_keyboard_listener():
#     with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
#         listener.join()

# async def main():
#     global loop
#     loop = asyncio.get_running_loop()
    
#     server = await websockets.serve(handle_client, "localhost", 8765)
    
#     # Start the keyboard listener in a separate thread
#     threading.Thread(target=start_keyboard_listener, daemon=True).start()
    
#     print("WebSocket server started on ws://localhost:8765")
#     await server.wait_closed()

# if __name__ == "__main__":
#     asyncio.run(main())

import asyncio
import websockets
import json
from pynput import keyboard
import threading
import http.server
import socketserver
import os

connected_clients = set()
loop = None

async def handle_client(websocket, path):
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        connected_clients.remove(websocket)

async def broadcast_key_event(key, event_type):
    if connected_clients:
        message = json.dumps({"key": key, "type": event_type})
        await asyncio.gather(*[client.send(message) for client in connected_clients])

def on_press(key):
    key_char = key.char if hasattr(key, 'char') else key.name
    asyncio.run_coroutine_threadsafe(broadcast_key_event(key_char, "keydown"), loop)

def on_release(key):
    key_char = key.char if hasattr(key, 'char') else key.name
    asyncio.run_coroutine_threadsafe(broadcast_key_event(key_char, "keyup"), loop)

def start_keyboard_listener():
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()

def start_file_server(port, directory):
    try:
        os.chdir(directory)
        Handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print(f"Serving files from '{directory}' on http://localhost:{port}")
            httpd.serve_forever()
    except FileNotFoundError:
        print(f"Error: Directory '{directory}' not found. Please check the path.")
    except PermissionError:
        print(f"Error: Permission denied to access '{directory}'. Please check your permissions.")
    except Exception as e:
        print(f"An error occurred while starting the file server: {str(e)}")

async def main():
    global loop
    loop = asyncio.get_running_loop()

    websocket_server = await websockets.serve(handle_client, "localhost", 8765)
    
    # Start the keyboard listener in a separate thread
    threading.Thread(target=start_keyboard_listener, daemon=True).start()
    
    # Start the file server in a separate thread
    file_server_port = 8000
    dist_directory = 'dist'  # Change this to the correct path of your 'dist' directory
    
    threading.Thread(target=start_file_server, args=(file_server_port, dist_directory), daemon=True).start()

    print("WebSocket server started on ws://localhost:8765")
    
    await websocket_server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
