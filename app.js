require ('./src/database')
let mongoose = require('mongoose');


// Déclaration du Schema de structure
let personSChema = new mongoose.Schema({
    name : { type : String,  required : true},
    age : {type : Number},
    favoriteFoods : [{type : String}]
})

//Création du modele Person
let Person = mongoose.model('Person', personSChema);

//Création d'un document person
let newPerson = new Person({
    name : 'Mounir',
    age : 28,
    favoriteFoods : ['Tacos viande']
})

// enregistrement du document à la base de donnée
newPerson.save()
.then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });


//enregistrement du tableau d'objet
Person.create([
    {name : 'Saher', age : 27, favoriteFoods : ['Tchiep','pilaou']},
    {name : 'Kala', age : 27, favoriteFoods : ['kebab']}, 
    {name : 'Kader', age : 18, favoriteFoods : ['pancake']}])
.then(() => {
    console.log('manyPeople have been saved successfully');
})
.catch(() => {
    console.error('Error');
});

// recherche de recherche de toutes les personnes présentent dans la base de donnée
Person.find({})
.then((people) => {
    console.log(people);
  })
  .catch((err) => {
    console.error(err);
  });

  // recherche d'un document Person via sa propriété favoriteFood
  Person.findOne({favoriteFoods : 'kebab'})
  .then((person) => {
    console.log(person);
  })
  .catch((err) => {
    console.error(err);
  });


// recherche de Person via son id
  Person.findById('65a9e26927c2a8bb5efd904f')
  .then((person) => {
    if (!person) {
        console.log('Person not found');
    } else {
        console.log(person);
    }
})
.catch((err) => {
    console.error(err);
});


  // mise à jour classique 
Person.findById('65a9e26927c2a8bb5efd904f')
.then((person) => {
    if (!person) {
        console.log('Person not found');
    } else {
        person.favoriteFoods.push('humberger')

        person.save().then((person) => {
                console.log(person, ' have been updated successfully');
        })
        .catch((err) => {
            console.error(err);
        });
    }
})
.catch((err) => {
    console.error(err);
});


// recherche et mise à jour d'un document Person et renvoie d'un document à la base de donnée
Person.findByIdAndUpdate('65a9e309452e8ea8fd17b645')
.then((person) => {
    if (!person) {
        console.log('Person not found');
    } else {
        console.log(person);
    }
})
.catch((err) => {
    console.error(err);
});


// recherche d'un document et suppression via son ID et renvoie du resultat du nombre de documents supprimés
Person.findByIdAndDelete('65a9e56845dd880720dc086d').then((person) => {
    if (!person) {
        console.log('Person not found');
    } else {
        console.log(person, ' deleted successfully');
    }
})
.catch((err) => {
    console.error(err);
});

// suppression de tous les documents comportement le nom spécifié
Person.deleteMany({name : 'kader'}).then((result) => {
    if (result.deletedCount === 0) {
        console.log('No matching documents found');
    } else {
        console.log(result.deletedCount, 'documents deleted successfully');
    }
})
.catch((err) => {
    console.error(err);
});

// recherche par favoriteFoods, masquage de la propriété age, trie par le nom, limite les resultat à 2 documents et renvoie du resultat
Person.find({favoriteFoods : 'kebab'},'-age').sort().limit(2).exec().then((person) => {
    if (!person) {
        console.log('Person not found');
    } else {
        console.log("kebab's lovers : ", person);
    }
})
.catch((err) => {
    console.error(err);
});








