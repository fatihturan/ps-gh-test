# pine-sports-site
Django App for Pine Site


## Local Tool Testing
- Install `requirements.txt` in a virtual environment
- Set environment variables for tools (e.g. source `env_local.sh` on macOS)
- From the root directory run: `python3 chat/tools/tool_test.py --file <tool_file_name> --function <function_name> --args <arg1>, <arg2> ...
- Example: `python3 chat/tools/tool_test.py --file get_news_and_tweets --function get_news --args 'Zach LaVine performance against Memphis Grizzlies','day'`
