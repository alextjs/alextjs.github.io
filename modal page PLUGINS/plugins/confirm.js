$.confirm = function (options) {
    return new Promise( (resolve, reject) => {
    const modal = $.modal( {
        title: options.title,
        width: '400px',
        closable:  false,
        content: options.content,
        onClose() {
        modal.destroy()
        },
        footerButtons: [
            {text: 'Cancel', type: 'secondary', handler() {
                    console.log('Primary btn clicked')
                    modal.close()
                    reject()
                }},
            {text: 'Delete', type: 'danger', handler() {
                    console.log('Danger btn clicked')
                    modal.close()
                    resolve()
                }}
        ]
    })

        setTimeout( () => modal.open(), 100)
    })
    // const confirmModal = $.modal( {
    //     title: 'Вы уверены?',
    //     closable: true,
    //     content: ``,
    //     width: '400px',
    //     footerButtons: [
    //         {text: 'Cancel', type: 'secondary', handler() {
    //                 console.log('Primary btn clicked')
    //                 confirmModal.close()
    //             }}
    //     ]
    // })
}

