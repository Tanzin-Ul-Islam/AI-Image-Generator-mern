import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config()
class DalleController {

    openaiConfig = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    openAi = new OpenAIApi(this.openaiConfig)

    generateImage = async (req, res) => {
        try {
            const { prompt } = req.body;
            await this.openAi.createImage({
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'b64_json'
            }).then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    res.status(200).send({ status: 'success', data: data });
                } else {
                    res.status(400).send({ status: 'error' });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({ status: 'error' });
        }
    }

}
export default new DalleController;