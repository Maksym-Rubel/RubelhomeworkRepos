import axios from "axios";
import { accountService } from "./account.service";
import { refreshService } from "./refreshToken.service";
import { CounterContext } from "../context/currenthome";
import { useContext } from "react";

// const API_URL = import.meta.env.VITE_API_URL;

// const { API_URL_CON } = useContext(CounterContext);

export const returnUserclass =
{
    async returnUser() {
        try {
            const res = await axios.post(`https://lciz5txpis.eu.loclx.io/api/Account/Refresh?token=${refreshService.get()}`)
            // accountService.logout();
            console.log(res);
            accountService.login(res.data.accesessToken, res.data.refreshToken);
            return true;

        }
        catch (error) {

            console.log("REloginError");
            accountService.logout();
            return false;
        }
    }
}
