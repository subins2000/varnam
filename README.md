# Varnam Editor

This repo is of **Varnam** editor, the frontend webapp for [`libvarnam`](http://github.com/varnamproject/libvarnam). [Read more about Varnam & Varnam Editor](https://subinsb.com/varnam).

* The underlying [varnamproject](http://varnamproject.com/)
* [Download Varnam Editor flatpak package](https://github.com/subins2000/varnam/releases)
* [Flatpak packaging repo](https://github.com/subins2000/varnam-flatpak)

The **Varnam** (`com.varnamproject.Varnam`) software bundles `libvarnam`, `varnamc` & this editor along with [Malayalam learnings](http://mirror.rackdc.com/savannah/varnamproject/words/ml.full.tar.gz) for better Malayalam support. This entire bundle is named **Varnam**. The editor can be opened then with `varnam` and `varnamc` can be ran with `varnam varnamc`.

Revamped Varnam Editor logo made by [Radhika Sharma](https://twitter.com/radhikaa2001)

## TODO

* [ ] Use [varnamd](https://github.com/varnamproject/varnamd) instead of executing commands (was my stupid implementation choice). This will eliminate Ruby dependency for flatpak package (but then [`varnamc` won't work](https://github.com/varnamproject/libvarnam/issues/154))
* [ ] Add [spellchecker](https://gitlab.com/smc/mlmorph-spellchecker)
* [ ] Possibly make a browser editor
