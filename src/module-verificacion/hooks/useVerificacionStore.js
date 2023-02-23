import { useDispatch, useSelector } from "react-redux";
import {
    onCheckingPeticion, onCheckingVerificacion, onFailPeticion, onNoVerificando,
    onOffPeticion, onOkPeticion
} from "../../store/verificacion-voto/verificacionSlice";

    export const useVerficacionStore = () => {
        const dispatch = useDispatch();
        const { 
            status, 
            errorMessage, 
            statusPeticion, 
            claveVoto, 
            votos,
            jornadasFolio,
            votoSelected 
        } = useSelector((state) => state.verificacion);
        
        const checkingVerificacion = () => dispatch(onCheckingVerificacion());
        // const verificando = (claveVoto) => dispatch(onVerificando(claveVoto));
        const noVerificando = () => dispatch(onNoVerificando());
        
        const checkingPeticion = () => dispatch(onCheckingPeticion());
        const okPeticion = () => dispatch(onOkPeticion());
        const failPeticion = () => dispatch(onFailPeticion());
        const offPeticion = () => dispatch(onOffPeticion());

        const onFillVoto = (votos) => dispatch(onFillVoto(votos));
        const onValidarVoto = (votoSelected) => dispatch(onValidarVoto(votoSelected));
    return {
        status, 
        errorMessage, 
        statusPeticion, 
        claveVoto, 
        votos, 
        votoSelected,
        jornadasFolio,
        checkingPeticion,
        okPeticion,
        failPeticion,
        offPeticion,
        onFillVoto,
        onValidarVoto,
        checkingVerificacion,
        // verificando,
        noVerificando,
    };
};