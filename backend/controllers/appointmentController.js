

const createAppointment = async (req, res) => {
    try {
        console.log("desde createAppointment");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        });
    }    
}

export {
    createAppointment
}
