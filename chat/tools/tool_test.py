import argparse
import importlib
import sys
import os
import django
import asyncio

def main():
    parser = argparse.ArgumentParser(description="Test a specific function from a tool file.")
    parser.add_argument('--file', required=True, help="Name of the tool file (without .py extension)")
    parser.add_argument('--function', required=True, help="Name of the function to run")
    parser.add_argument('--args', help="Comma-separated arguments for the function", default="")

    args = parser.parse_args()
    file_name = args.file
    function_name = args.function
    function_args = args.args.split(',')

    # Add the project root directory to sys.path
    # This should be the path to the pine-sports-site directory
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

    # Set up Django settings and initialize
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djPine.settings')  # Replace with your actual settings path
    django.setup()

    try:
        # Import the specified module from the 'chat/tools' directory
        module = importlib.import_module(f'chat.tools.{file_name}')

        # Check if the function exists in the module
        if hasattr(module, function_name):
            func = getattr(module, function_name)
            # Check if the function is asynchronous and run accordingly
            if asyncio.iscoroutinefunction(func):
                result = asyncio.run(func(*function_args))
            else:
                result = func(*function_args)
            print(f"Result: {result}")
        else:
            print(f"Function '{function_name}' not found in the '{file_name}' module.")
    except ModuleNotFoundError:
        print(f"Tool file '{file_name}' not found in the 'tools' directory.")
    except Exception as e:
        print(f"Error while running the function: {e}")

if __name__ == '__main__':
    main()