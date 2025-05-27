import type { JSX } from "react";
import BaseAnimate from "../BaseAnimate";
import React from "react";

type TModal = {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element | null;
    title: string;
}

const Modal = ({ isOpen, onClose, children, title }: TModal) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-800/50 z-50">
            <BaseAnimate className="w-full max-w-xl">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <div className="flex justify-between border-b border-slate-200">
                        <h3 className="text-lg font-bold text-center text-slate-800">{title}</h3>
                        <button className="ml-auto block mb-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
                            Fechar ✖
                        </button>
                    </div>
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </BaseAnimate>
        </div>
    );
}

export default React.memo(Modal);