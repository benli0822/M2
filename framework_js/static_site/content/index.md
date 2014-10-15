---
title : premier post
date : 2013-12-12 12:00:00
description : une courte description
---

# Page d'accueil

Ceci est la page d'accueil du site statique

* [Lien direct vers un post (répertoire)](post1/index.html)
* [Lien direct vers une autre page](about.html)

```javascript

var callback = function (err, data) {
    if (err) return console.error(err);
    console.log(data);
};

function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) return callback(err);
    try {
      res = JSON.parse(res);
    } catch (ex) {
      return callback(ex);
    }
    callback(null, res);
  });
}

```

Lorem markdownum illam alis aratri, cum diversa omine, erat in subiectaque ulvis
sic secretaque urbemque. Fons arripit lumina cinnama de cantat dona qui minasque
victorem expetitur flammis.

## Iamque et et ulterius exhausta

Virum illa haec spatiumque. Verba et quod exercent Chromis. Figuram se medicina,
cognosceret verbaque, et imago *vicit* foret. Bellator rustica demittite in
corde Iuppiter perque conplexusque tamen fretumque et formae studiis habet
amores **sapiente**.
