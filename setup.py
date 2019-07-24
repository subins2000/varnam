#!/usr/bin/env python3

from setuptools import find_packages, setup

setup(
    name='Varnam',
    version='0.1',
    url='https://subinsb.com/varnam',
    author='Subin Siby',
    author_email='mail@subinsb.com',
    description=('An Indic language transliteration editor.'),
    license='GPL',
    install_requires=[
        'eel'
    ],
    packages=find_packages(exclude=['web']),
    entry_points={'gui_scripts': [
        'varnam = varnam.Varnam:main'
    ]},
) 
