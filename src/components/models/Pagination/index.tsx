import React, { useCallback } from "react";
import BaseAnimate from "../BaseAnimate";
import type { TPaginagion } from "@/types/TPaginagion";
import Button from "@/components/models/Button";
import { StepBack, StepForward } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }: TPaginagion) => {
    const nextPage = useCallback(() => setCurrentPage(currentPage + 1), [currentPage]);
    const prevPage = useCallback(() => setCurrentPage(currentPage - 1), [currentPage]);
    const firstPage = useCallback(() => setCurrentPage(1), [currentPage]);
    const lastPage = useCallback(() => setCurrentPage(totalPages), [currentPage]);
    return (
        <BaseAnimate className="w-full">
            <section className="w-full py-5">
                <nav className="flex gap-1">
                    {currentPage > 1 && (
                        <>
                            <Button onClick={firstPage}>
                                <StepBack className="w-4 h-4" />
                            </Button>
                            <Button onClick={prevPage}>
                                {currentPage - 1}
                            </Button>
                        </>
                    )}
                    <Button className="text-dark font-bold border border-slate-700">
                        {currentPage}
                    </Button>

                    {currentPage < totalPages && (
                        <>
                            <Button onClick={nextPage}>
                                {currentPage + 1}
                            </Button>
                            <Button onClick={lastPage}>
                                <StepForward className="w-4 h-4" />
                            </Button>
                        </>

                    )}
                </nav>
            </section>
        </BaseAnimate>
    )
}

export default React.memo(Pagination);