
import '../css/components.css';

export const saludar = ( nombre ) => {

    const _h1 = document.createElement("h1");
    _h1.innerHTML = "Te amo mucho mi amor " + nombre;
    
    document.body.append(_h1);
}