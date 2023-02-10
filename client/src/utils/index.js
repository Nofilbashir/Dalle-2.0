import {surpriseMePrompts} from '../constants/index'
import FileSaver from 'file-saver'


export const getRandomPropt = (prompt) =>{
    const randomIndex = Math.floor(Math.random() *surpriseMePrompts.length)

    const randomPrompt = surpriseMePrompts[randomIndex];
    if(randomPrompt === prompt){
        return getRandomPropt(prompt)
    }
    return randomPrompt
}



export async  function downloadImage (_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}