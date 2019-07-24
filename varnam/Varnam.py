import eel
import os
import subprocess


def main():
    @eel.expose
    def transliterate(language, text):
        try:
            out = subprocess.run(['varnamc', '-s', language, '-t', text], stdout=subprocess.PIPE).stdout.decode('utf-8')

            if out[0:1] == ' ':
                suggestions = out.split('\n')[0:9]
                eel.showSuggestions(text, suggestions)
            else:
                # Error message
                eel.showError(out)
        except Exception as e:
            eel.showError(str(e))

    eel.init(os.path.join(os.path.realpath(os.path.dirname(__file__)), 'web'))

    try:
        # try chromium/chrome
        eel.start('index.html')
    except EnvironmentError:
        print('Chromium not found. Opening in browser')
        eel.start('index.html', options={'mode': 'default'})
 
