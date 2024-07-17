document.addEventListener('DOMContentLoaded', () =>{
    const skills = document.querySelector('.lista-conocimientos');

    if(skills){
        skills.addEventListener('click', agregarSkills);

        // una vez que estamos en editar, llamar función
        skillsSeleccionados()
    }

})


const skills = new Set();

const agregarSkills = e => {
    
    if(e.target.tagName === 'LI'){

        if(e.target.classList.contains('activo')){
            // quitarlo del set y quitar la clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        }else{
            // agregarlo al set y agregar la clase
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
        
    } 

    const skillsArray = [...skills]
    document.querySelector('#skills').value = skillsArray

}

const skillsSeleccionados = () => {
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'))

    seleccionadas.forEach(seleccionada => {
        skills.add(seleccionada.textContent)
    })

    // inyectarlo en el input (hidden)
    const skillsArray = [...skills]
    document.querySelector('#skills').value = skillsArray
}