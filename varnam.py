import eel
import subprocess


@eel.expose
def transliterate(text):
    out = subprocess.run(['varnamc', '-s', 'ml', '-t', text], stdout=subprocess.PIPE).stdout.decode('utf-8')
    suggestions = out.split('\n')[0:8]
    eel.showSuggestions(text, suggestions)

eel.init('web')
eel.start('index.html', options={'mode': 'default'})
