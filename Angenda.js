document.addEventListener('DOMContentLoaded', function() {
    
    fetchContacts();

  
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        saveContact();
    });

   
    document.getElementById('search').addEventListener('input', filterContacts);
});


function fetchContacts() {
    fetch('http://www.raydelto.org/agenda.php')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contacts');
            contactList.innerHTML = ''; 
            data.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                contactList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener los contactos:', error));
}


function saveContact() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const contact = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(contact) 
    })
    .then(response => response.json())
    .then(data => {
        alert('Contacto guardado exitosamente');
        fetchContacts(); 
    })
    .catch(error => {
        console.error('Error al guardar el contacto:', error);
        alert('Hubo un error al guardar el contacto. Por favor, inténtalo de nuevo.');
    });
}



function filterContacts() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const contacts = document.querySelectorAll('#contacts li');

    contacts.forEach(contact => {
        const contactText = contact.textContent.toLowerCase();
        if (contactText.includes(searchValue)) {
            contact.style.display = '';
        } else {
            contact.style.display = 'none';
        }
    });
}
