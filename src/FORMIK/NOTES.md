Configurar usuario  de manera global

git config --global user.email zefetorres@icloud.com
git config --global user.name "zefetorres"
git config --global color.ui true   //colores

git init : crear reporsitorio
git status : nos muestran el estatus de los archivos que tenemos

git add NOMBREARCHIVO / git add -A : Para agregarlos al working staging
git rm --cached <file>..." to unstage : para sacarlo del working staging
git rm -f [file]  Elimina el archivo por completo del proyecto.

git commit -m "inicializar nuestro landing"
git commit --amend : concatena nuevos cambios con cambios previos
git log: nos muestra la historia de todos los commits que hemos realizados.

git tag : nos permite agregar etiquetas a nuestros cambios commits
git tag -a 0.5 -m 'Version estable del proyecto' : etiqueta el ultimo commit
git tag 0.3 2a932b8fe8c86d16a1148900f4c28a2c4919abd3 : Utilizando el Sha-1 podemos                           crear etiquetas anotadas haciendo referencia a commits viejos.
git tag -l : muestra la lista de tags
git tag -d 0.3 : borrar un tag
git tag -f -a 0.3 -m 'iniciando' 2a932b8fe8c86d16a1148900f4c28a2c4919abd3 : Renombrar tag

git log : te muestra la lista de commits
git log --oneline : resume con menos detalles la lista de commits
git log --oneline --graph : grafico de como avanza la historio de nuestro proyecto     para ver ramas
git log -1 :  ver commit especifico

git diff 2a932b8fe8c86d16a1148900f4c28a2c4919abd3 : para ver que ha cambiado entre mi estado actual y el commit que puse.

git reset --soft sha7 : para borrar un commit si es el ultimo sha8, tendria que poner desde sha7
git reset --soft [SHA 1]: elimina los cambios hasta el staging area
git reset --mixed [SHA 1]: elimina los cambios hasta el working area
git reset --hard [SHA 1]: regresa hasta el commit del [SHA 1]

8de077d integrating firebase
git reset --soft 4ac1f09

Es bueno hacer un backup de git log que viene siendo la losta de tus commits SHA1
y con git reset --hard [sha1] recuperas si por accidente borraste commits

git config --global core.editor "tueditor"

git branch [nombre de la rama] : crear una nueva rama
git branch -d [nombre de la rama] : borrar una rama
git branch -D [nombre de la rama] : forzamos a borrar una rama que tiene cambios
git branch -l : listamos las ramas que tenenos
git branch -m [nombre rama actual] [nuevo nombre rama] : renombrar una rama

git checkout [nombre rama]  : nos movemos de rama
git checkout [SHA1] : nos movemos a un commit en el tiempo sin borrar nanda
git checkout master : para volver a la rama principal
git checkout -b [nombre de la rama] crea y te mueve a esa rama


git merge : mezclar cambios primero colocarse "git checkout master" en la rama que quieres obtener los cambios.

git merge hotfix


git rebase : hace lo mismo que merge pero no se recomienda 

git log --online --graph : ver logs con grafica

git stash : guarda cambios temporalmente, como el staging area. :::::::::::::::::::::::
Se usa cuando quieres cambiarte de rama pero has hecho cambios en tus archivos de la rama actual. ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
git stash list : nos muestra la lista de stash que tengamos.
git stash drop stash@{numero} : nos permite borrar un stash.
git stash apply stash@{3} : aplicamos el último cambio

git cherry-pick [hash] : hash del commit que queremos copiar de otra rama a la nueva rama

#Si estás trabajando en una rama, pero de repente notas que hiciste un cambio en la rama que no debías, para esto podemos usar cherry pick. Este comando nos puede salvar la vida, ya que nos permite sacar cambios específicos de una rama y mezclarlos en otra.

git log --oneline --graph -decorate : chido

LLAVE GITHUB

1: ssh-keygen -t rsa -b 4096 -C "email@email.com".

2: $ pbcopy < ~/.ssh/id_rsa.pub
    bash: pbcopy: command not found

  WINDOWS Use:
  $ cat ~/.ssh/id_rsa.pub

git remote (Añadiendo un repositorio remoto a uno local)
git remote add origin https://github.com/zefetorres/invi.git
git remote -v : verificar si lo bajo bien
git remote remove origin : para eliminarlo porsi no lo vamos a usar

git fetch origin master 
# origin= remoto | master= rama del remoto
# ahora tienes una rama llamada origin/master
# que pueedes ver con 'git branch -a'
git merge origin/master
# si obtienes un error usar la siguiente linea
# git merge origin/master --allow-unrelated-histories
git pull origin master

git push origin master : subiendo cambios de local al repositorio remoto
git push origin master --tags : subiendo etiquetas
git push origin [rama] : eniar ramas a repositorios remotos


