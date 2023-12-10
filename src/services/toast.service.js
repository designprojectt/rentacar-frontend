import {GpToastType, useGrillePain} from "vue-grille-pain";

const { toast } = useGrillePain();

export const toastSuccess = (message) => {
    toast({
        title: "Success",
        message: message,
        type: GpToastType.SUCCESS,
    });
}

export const toastError = (message) => {
    toast({
        title: "Error",
        message: message,
        type: GpToastType.ERROR,
    });
}