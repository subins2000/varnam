import eel
import subprocess


@eel.expose
def transliterate(language, text):
    out = subprocess.run(['varnamc', '-s', language, '-t', text], stdout=subprocess.PIPE).stdout.decode('utf-8')
    suggestions = out.split('\n')[0:9]
    eel.showSuggestions(text, suggestions)

eel.init('web')
eel.start('index.html', options={'mode': 'default'})
