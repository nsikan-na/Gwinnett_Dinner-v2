import nc from "next-connect";
import { getAllUsers } from "../../controller";

const handler = nc();
handler.get(getAllUsers);
export default handler;
