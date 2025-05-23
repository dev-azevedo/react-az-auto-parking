import BaseAnimate from "@/components/models/BaseAnimate";

const Parking = () => {
    return (
        <BaseAnimate>
            <section className="w-full px-5 xl:px-46 py-10">
                <header>
                    <h2 className="text-dark font-bold xl:text-4xl mb-1">Gerenciamento de Estacionamento</h2>
                    <p className="text-slate-400">Controle e monitore todas as vagas do seu estacionamento</p>
                </header>

                <div>
                    <div className="xl:p-5 py-5 w-full flex flex-col gap-3 justify-between items-center">
                        <div className="bg-slate-100 p-5 rounded-md w-full">Total de vagas: 20</div>
                        <div className="bg-slate-100 p-5 rounded-md w-full">Vagas disponíveis: 10</div>
                        <div className="bg-slate-100 p-5 rounded-md w-full">Vagas ocupadas: 10</div>
                    </div>
                </div>
            </section>
        </BaseAnimate>
    );
};

export default Parking;