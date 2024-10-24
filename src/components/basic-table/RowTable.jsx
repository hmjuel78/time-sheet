
const RowTable = () => {

    const users = [
        {
            name: 'juel',
            email: 'hmjuel78@gmail.com',
            phone: '009938874',
            id: 1,
        },
        {
            name: 'hm',
            email: 'hmjuel78@gmail.com',
            phone: '009938874',
            id: 2,
        },
        {
            name: 'haqw',
            email: 'hmjuel78@gmail.com',
            phone: '009938874',
            id: 3,
        },
        {
            name: 'ayat',
            email: 'hmjuel78@gmail.com',
            phone: '009938874',
            id: 4,
        },
    ]

    // const orderedKeys = ['id', 'name', 'phone', 'email']

    // const newArray = users.map(user => {
    //     return orderedKeys.map(key => user[key])
    // });

    const orderedKeys = ['id', 'name', 'email', 'phone']
    const userlists = users.map(user => {
        return orderedKeys.map(key => user[key])
    })
    console.log(userlists);


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            orderedKeys.map(key => (
                                <th key={key}>{key}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        userlists.map(user => (
                            <tr key={user.id}>
                                {
                                    Object.keys(user).map(key => (
                                        <td key={key}>{user[key]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </div>
    );
};

export default RowTable;