import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStore} from "@/store/store";

export const useTypedSelector: TypedUseSelectorHook<ReturnType<AppStore['getState']>> = useSelector;
