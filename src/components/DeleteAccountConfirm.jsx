import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../validations/auth.schema";
import { DELETE_CONFIRM_TEXT } from "../utils/constants";
import useDeleteAccount from "../hooks/useDeleteAccount";

export default function DeleteAccountConfirm({ onClose }) {
    const { handleDelete } = useDeleteAccount();

    const { 
        register, 
        handleSubmit, 
        formState: { isValid }
    } = useForm({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onChange",
    });

    const onSubmit = () => {
        handleDelete(); 
    };

    return (
        <div className="flex flex-col items-center pt-2 pb-1">
            
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-error" /> 
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-base-content mb-2 text-center">
                Delete Account
            </h2>
            
            <p className="text-base-content/60 text-xs md:text-[13px] mb-6 text-center px-2 md:px-4 leading-relaxed">
                This action is permanent. All your data, matches, and messages will be wiped out.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 md:gap-5">
                
                <div className="w-full bg-base-200/40 p-3 md:p-4 rounded-xl border border-base-content/10">
                    <label className="text-xs md:text-[13px] text-base-content/60 mb-2 md:mb-3 block text-center">
                        Type <span className="font-bold text-base-content select-none">delete my account</span> to verify:
                    </label>
                    <input 
                        type="text" 
                        autoComplete="off"
                        {...register("confirmText")}
                        className="w-full bg-base-100 border border-base-content/20 rounded-lg px-4 py-2.5 text-base-content focus:outline-none focus:border-error transition-colors text-center text-sm"
                        placeholder={DELETE_CONFIRM_TEXT}
                    />
                </div>

                <div className="flex w-full gap-2 md:gap-3 mt-1">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="flex-1 py-2.5 md:py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 text-base-content font-semibold transition-colors text-sm md:text-base"
                    >
                        Cancel
                    </button>
                    
                    <button 
                        type="submit"
                        disabled={!isValid}
                        className="flex-1 py-2.5 md:py-3 px-4 rounded-xl font-bold transition-all text-sm md:text-base disabled:bg-base-300 disabled:text-base-content/40 bg-error hover:bg-error/80 text-error-content shadow-lg"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}