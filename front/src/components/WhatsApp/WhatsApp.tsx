import { FaWhatsapp } from 'react-icons/fa';


const WhatsApp = () => {
    const whatsappNumber = '3424383363'; 
    const message = 'Hola, estoy interesado en sus productos.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
   
  return (
    <div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-20 bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <FaWhatsapp size={30} /> 
      </a>
    </div>
  );
};

  export default WhatsApp;
  