import {Select} from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
    placeholder: 'Select the element',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
        {id: '4', value: 'React Native'},
        {id: '6', value: 'Next'},
    ]
})

window.s = select