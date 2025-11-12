import axios from "axios";
import { accountService } from "./account.service";
import { refreshService } from "./refreshToken.service";

const API_URL = process.env.VITE_API_URL;

export const returnUserclass =
{
    async returnUser() {
        try {
            const res = await axios.post(`${API_URL}/api/Account/Refresh?token=${refreshService.get()}`)
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
