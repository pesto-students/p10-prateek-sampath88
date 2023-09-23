const { groupBy } = require("../../utils/common");
const { Investments } = require("./module");

const validGetInvestmentQueryTypes = ['ASSET', 'FD', 'BONDS', 'STOCKS'];


const getUserInvestments = async (req, res) => {
    const { type } = req.query;
    const userID = req?.user?.id;
    let response;

    if (type) {
        if(!validGetInvestmentQueryTypes.includes(type)){
            return res.status(400).send({ error: 'Bad Request, Invalid Type' });
        }

        response = await Investments.findAll({
            where: {
                userID,
                investmentType: type
            }
        });
    }
    else {
        response = await Investments.findAll({
            where: {
                userID,
            }
        })
    }

    return res.status(200).send(groupBy(response, 'investmentType'));
}

const addUserInvestment = async (req, res) => {
    const userID  = req?.user?.id;
    const data = req.body;

    if (!data || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data Format' })
    }
    else if (
        !(data.hasOwnProperty("investmentType") &&
            data.hasOwnProperty("investmentAmount") &&
            data.hasOwnProperty("returnAmount") &&
            typeof data.investmentAmount === 'number' &&
            typeof data.returnAmount === 'number' &&
            typeof data.investmentType === 'string' &&
            validGetInvestmentQueryTypes.includes(data.investmentType)
        )
    ) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data Format' })
    }
    else {
        const investmentData = {
            userID,
            investAmount: data.investmentAmount,
            returnAmount: data.returnAmount,
            investmentType: data.investmentType,
        };
        console.log(investmentData)
        await Investments.create(investmentData);
        console.log("invested added");
    }
    return res.status(200).send();
}

const updateUserInvestment = async(req, res) => {
    const userID = req?.user?.id;
    const {id} = req.query;
    const data = req.body;

    if (!data || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data Format' })
    }
    else {
        const investmentData = {
            investAmount: data?.investmentAmount,
            returnAmount: data?.returnAmount,
            investmentType: data?.investmentType,
        };
        const response = await Investments.update(investmentData,{
            where: {
                userID,
                id,
            }
        });

        return res.status(200).send(response);
    }

}


const deleteUserInvestment = async(req, res) => {
    const userID = req?.user?.id;
    const { id }= req.query;

    if (!id || !userID) {
        return res.status(400).send({ error: 'Bad Request, Invalid Data' })
    }
    else {

        await Investments.destroy({
            where: {
                id
            }
        })

        return res.status(200).send();
    }

}



module.exports = {
    getUserInvestments,
    addUserInvestment,
    updateUserInvestment,
    deleteUserInvestment
}