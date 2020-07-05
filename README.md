# 2019-2020-ps6-rendu-rip
# Script d'installation:

Un tag a été ajouté: "vSI4" (dernière version donnée aux SI4) 

La première chose à faire est de cloner le projet grâce à cette commande :
 	⇒ git clone https://github.com/2019-2020-ps6/2019-2020-ps6-rendu-rip.git
Puis au cas où avec le tag:
	⇒ git checkout vSI4

Il faut ensuite se mettre dans le dossier back-end et faire :
	⇒ npm install
De même dans le dossier front-end :
	⇒ npm install

Pour lancer le projet il faut faire :
	⇒ npm run dev (pour le mode dev/restart le serveur rapidement OU "npm start") dans le dossier back-end ("localhost:9428/api/<requete>")
	⇒ ng serve --open (OU "npm start" puis ouvrir un navigateur et entrer "localhost:4200") dans le dossier front-end 
	
	(⇒ Entrer l’adresse : http://localhost:4200/) si "npm start" et pas "ng serve --open" (ouvre automatiquement la page donc)

→ Howtoplay:
le mode “Personnel” doit se faire en mode ordinateur (classique)
le mode “Accueilli” doit se faire en mode tablette (puisqu’ils utilisent des tablettes dans le centre d’accueil de jour)
F12 pour ouvrir la console
	Cliquer sur les icônes tel/tablette (vue adaptative)
	Sélectionner le mode “iPad” (ou iPad pro? Dépend de ce que le centre d'accueil possède comme tablettes??)

Pour aller à la page du personel saisir le code "1234"

Voilà
