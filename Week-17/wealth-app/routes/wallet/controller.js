const BigPromise = require("../../middlewares/BigPromise");
const { groupBy } = require("../../utils/common");
const { Wallet } = require("./module");

const validWalletTypes = ['income', 'saving', 'expense'];


const getUserWalletSummary = BigPromise( async (req, res, next) => {
    const userID = req?.user?.id;
    let response;
    let summary = {
        saving: 0,
        income: 0,
        expense: 0,
    }

    response = await Wallet.findAll({
        where: {
            userID,
        }
    })

    response.reduce((res, cur) => {
        if (cur.type === 'credit') {
            res.income += cur.amount
        }
        else if (cur.type === 'debit') {
            res.expense += cur.amount
        }
    }, summary);

    summary.saving = summary.income - summary.expense < 0 ? 0 : summary.income - summary.expense;

    return res.status(200).json(summary);
})

const getUserWalletDetails = BigPromise(async (req, res) => {
    const { type, filter } = req.query;
    const userID = req?.user?.id;
    let response;

    if (type) {
        if (!(type === 'income' || type === 'expense')) {
            return res.status(400).send({ error: 'Bad Request, Invalid Type' });
        }

        if (type === 'incomde') {
            response = await Wallet.findAll({
                where: {
                    userID,
                    type: 'credit'
                }
            });
        }
        else if (type === 'expense') {
            response = await Wallet.findAll({
                where: {
                    userID,
                    type: 'debit'
                }
            });
        }

    }
    else {
        response = await Wallet.findAll({
            where: {
                userID,
            }
        })
    }

    return res.status(200).json(groupBy(response, type));
})

const addUserWallet = async (req, res) => {
    const userID = req?.user?.id;
    const data = req.body;

    if (!data || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data Format' })
    }
    else if (
        !(data.hasOwnProperty("type") &&
            data.hasOwnProperty("amount") &&
            (data.type === 'credit' || data.type === 'debit') &&
            typeof data.amount === 'number'
        )
    ) {
        return res.status(400).json({ error: 'Bad Request, Invalid Data Format' })
    }
    else {

        const walletData = {
            userID,
            type: data.type,
            amount: data.amount,

        };
        await Wallet.create(walletData);

        return res.status(200).json();
    }
}

const updateUserWallet = async (req, res) => {
    const userID = req?.user?.id;
    const data = req.body;

    if (!data || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data Format' })
    }
    else {
        const walletData = {
            type: data?.type,
            amount: data?.amount,
        };
        const response = await Wallet.update(walletData, {
            where: {
                userID,
                id: data.id,
            }
        });

        return res.status(200).json(response);
    }

}


const deleteUserWallet = async (req, res) => {
    const  userID = req?.user?.id;
    const { id } = req.query;

    if (!id || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data' })
    }
    else {

        await Wallet.destroy({
            where: {
                id,
                userID
            }
        })

        return res.status(200).json();
    }
}

const uploadInvoice = async (req, res) => {
    console.log(req.body)
    console.log(req.file);
    return res.status(200).json();

}


module.exports = {
    deleteUserWallet,
    addUserWallet,
    updateUserWallet,
    getUserWalletDetails,
    getUserWalletSummary,
    uploadInvoice
}