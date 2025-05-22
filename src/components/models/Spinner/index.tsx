import { Loader } from "lucide-react";
import React from "react";

const Spinner = ({ className }: { className?: string }) => {
    return (
        <Loader className={`animate-spin text-white ${className}`} />
    );
};

export default React.memo(Spinner);