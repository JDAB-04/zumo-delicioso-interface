
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "100% Productos Frescos",
    description: "Todas nuestras frutas son seleccionadas cuidadosamente para garantizar la máxima frescura.",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Cultivo Sostenible",
    description: "Trabajamos con agricultores que practican métodos sostenibles y respetuosos con el medio ambiente.",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Entrega a Domicilio",
    description: "Te llevamos tus frutas favoritas directamente a la puerta de tu casa en el mismo día.",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Calidad Garantizada",
    description: "Si no estás satisfecho con tu compra, te devolvemos tu dinero sin preguntas.",
    icon: CheckCircle,
  },
];

const Benefits = () => {
  return (
    <section id="nosotros" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <p className="section-subtitle">
          En Fruta Fresca nos comprometemos con la calidad y la frescura
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-fruit-green/10 p-3 rounded-full mb-4">
                <benefit.icon className="w-8 h-8 text-fruit-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
