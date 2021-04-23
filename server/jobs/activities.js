// ====================================================
//       Job Activity Offer Validate
// ====================================================

const cron = require('node-cron');
const { validateExpirationDate } = require('../utils/validations');
const Activity = require('../models').Activity;


//================================================
// Validar expiración de ofertas en actividades
//================================================
const expiration = cron.schedule('* * * * *', async function() {

    const activities = await Activity.findAll({ where: { inOffer: 1, status: 1 } })

    const expirationOffers = activities.filter(offer =>
        validateExpirationDate(offer.startDate) < 0);

    if (expirationOffers.length > 0)
        for await (offer of expirationOffers) {
            if (parseInt(offer.offerDay) + validateExpirationDate(offer.startDate) < 0)
                await Activity.update({ inOffer: 0 }, { where: { id: offer.id } });
        }
}, {
    scheduled: true,
    timezone: "America/Santiago"
});

module.exports = {
    expiration
}