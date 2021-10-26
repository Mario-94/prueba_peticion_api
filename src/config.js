import {config} from 'dotenv'
config()
export default {
    port:process.env.PORT || 5000
}