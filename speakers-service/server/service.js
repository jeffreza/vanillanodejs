
module.exports = (config) => {
const log = config.log();
const express = require('express');
const service = express();
const mongoose = require('mongoose');
const User = require('../data/userModel');

const Speakers = require('./lib/Speakers');

  const speakers = new Speakers(config.data.speakers);
  const connectDB = require('../data/db');
  connectDB();
service.use(express.json({ extended: false }));

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.use('/images/', express.static(config.data.images));

  service.get('/list', async (req, res, next) => {
    try {
      return res.json(await speakers.getList());
    } catch (err) {
      return next(err);
    }
  });

  service.get('/list-short', async (req, res, next) => {
    try {
      return res.json(await speakers.getListShort());
    } catch (err) {
      return next(err);
    }
  });

  service.get('/names', async (req, res, next) => {
    try {
      return res.json(await speakers.getNames());
    } catch (err) {
      return next(err);
    }
  });

  service.get('/artwork', async (req, res, next) => {
    try {
      return res.json(await speakers.getAllArtwork());
    } catch (err) {
      return next(err);
    }
  });

  service.get('/speaker/:shortname', async (req, res, next) => {
    try {
      return res.json(await speakers.getSpeaker(req.params.shortname));
    } catch (err) {
      return next(err);
    }
  });

  service.get('/user', async (req, res, next) => {
    try {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName
  
  res.json({firstName, lastName});
     
    } catch (err) {
      return next(err);
    }
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
