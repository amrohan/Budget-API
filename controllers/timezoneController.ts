import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';


const setTimeZone = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const { timezone } = req.body;
        if (timezone == undefined)
            return res.status(400).json({ message: "Please select a timezone" });

        // Set the 'timezone' cookie with the selected timezone
        res.cookie("timezone", timezone, { maxAge: 30 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ message: "Timezone set successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const getTimezoneFromCookie = (req: ExpressRequest) => {
    return req.cookies.timezone;
};

const getTimeZone = async (req: ExpressRequest, res: ExpressResponse) => {
    const timezone = getTimezoneFromCookie(req);
    if (timezone == undefined)
        return res.status(400).json({ message: "Please select a timezone" });

    res.status(200).json({ timezone });
};

export { getTimeZone, setTimeZone };