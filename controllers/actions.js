const _ = require("lodash");
const fs = require("fs");

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const db = require("../db/models");
const Timelog = db.timelog;

class Actions {
    constructor() {

    }

    async createNumber(req, res) {
        try {
            const today = moment().format('YYYY.MM.DD');
            let data = {
                num: req.params.num,
                date: today
            };

            await Timelog.build(data).save();
            res.status(200).json(data);

        } catch (e) {
            res.status(500).json(e);
        }
    }


    async getList(req, res) {
        try {
            let limit, offset, pagination;

            if (req.query.pageSize && req.query.page) {
                limit = +req.query.pageSize;
                offset = (+req.query.page - 1) * limit;

                pagination = {
                    limit: limit,
                    offset: offset
                }
            }

            const condition = {
                attributes: ['id', 'num', 'date'],
                ...pagination
            };

            const logs = await Timelog.findAll(condition);
            res.status(200).json(logs);

        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getStats(req, res) {
        try {
            let where;
            if (req.query.date) {
                where = {
                    date: req.query.date
                };
            }

            const condition = {
                group: ['date', 'num'],
                attributes: [
                    'date',
                    'num',
                    [db.sequelize.fn('COUNT', 'num'), 'count']],
                where: where
            };

            const logs = await Timelog.findAll(condition)
            let newLogs = {};

            if (req.query.date) {
                _.forEach(logs, (log) => {
                    newLogs[log.dataValues.num] = log.dataValues.count;
                });
            } else {
                _.forEach(logs, (log) => {
                    newLogs[log.dataValues.date] = {};
                });
                _.forEach(logs, (log) => {
                    newLogs[log.dataValues.date][log.dataValues.num] = log.dataValues.count;
                });
            }

            res.status(200).json(newLogs);

        } catch (e) {
            res.status(500).json(e);
        }
    }

    async downloadFile(req, res) {
        let readable = fs.createReadStream( __dirname + "/../public/images/background.png");
        readable.on('data',(data) => {
            console.log("New data in the stream");
        });
        readable.pipe(res);
    }
}

module.exports = Actions;
