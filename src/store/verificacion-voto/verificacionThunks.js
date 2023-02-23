import {
    getValidarVoto, getValidarVotosJornada, getVerificacionRespuesta, getVerificacionRespuestaFormal
} from '../../providers/Micro-Verificacion/providerVerificacion';
import { onCheckingPeticion, onCheckingVerificacion, onError, onFillJornadaSentidos, onFillVoto, onNoVerificando, onOkPeticion, onVerificado } from './verificacionSlice';



export const onGetValidarVoto = (claveVoto, navigate = () => {}) => {
    return async (dispatch) => {
		dispatch(onCheckingVerificacion());
        dispatch(onError());
        const { ok, data } = await getValidarVoto(claveVoto);
        console.log("data", data);
        if (ok) {
            dispatch(onFillVoto(data));
            dispatch(onVerificado());
            navigate();
        }
		 else {
            // console.log("entro al error");
			dispatch(onNoVerificando());
			dispatch(onError("No se encontró los resultados con ese folio. Por favor verifique el folio o intente con otro"));
		}
	};
}

export const onGetData = (values) => {
    return async (dispatch) => {
        const { ok, data } = await getValidarVoto(values);
        if (ok) {
            dispatch(onFillVoto(data));
        } else {
            dispatch(onError("Error"));
        }
    };
}
    // Obtenemos todas las jornadas con los sentidos con sus folios
export const onGetFoliosJornadas = () => {
    return async (dispatch) => {
        dispatch(onCheckingPeticion());
        const { ok, data } = await getValidarVotosJornada();
        if (ok) {
            dispatch(onFillJornadaSentidos(data));
            // dispatch(onOkPeticion());
        } else {
            dispatch(onError("Error"));
        }
    };
}



    // SOLO OIBTENEMOS UN CANDIDATO
export const onGetVerificacionRespuestaFormal = (uid) => {
    return async (dispatch) => {
        dispatch(onCheckingPeticion());
        const { ok, data } = await getVerificacionRespuestaFormal(uid);
        if (ok) {
            dispatch(onFillBoletas(data));
            dispatch(onOkPeticion());
        } else {
            dispatch(onError("Error"));
        }
    };
}
    // OIBTENEMOS un/dos/tres CANDIDATO
export const onGetVerificacionRespuesta = (uid) => {
    return async (dispatch) => {
        dispatch(onCheckingPeticion());
        const { ok, data } = await getVerificacionRespuesta(uid);
        if (ok) {
            dispatch(onFillBoletas(data));
            dispatch(onOkPeticion());
        } else {
            dispatch(onError("Error"));
        }
    };
}
