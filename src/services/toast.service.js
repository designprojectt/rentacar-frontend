import {GpToastType, useGrillePain} from "vue-grille-pain";

const { toast } = useGrillePain();

export const toastSuccess = (message) => {
    toast({
        title: "Başarılı",
        message: message,
        type: GpToastType.SUCCESS,
    });
}

export const toastError = (message) => {
    toast({
        title: "Hata",
        message: message,
        type: GpToastType.ERROR,
    });
}