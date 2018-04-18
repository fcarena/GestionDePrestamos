using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class SolicitudyAprobacionsController : ApiController
    {
        private dbGestionDePrestamosEntities db = new dbGestionDePrestamosEntities();

        // GET: api/SolicitudyAprobacions
        public IQueryable<SolicitudyAprobacion> GetSolicitudyAprobacion()
        {
            return db.SolicitudyAprobacion;
        }

        // GET: api/SolicitudyAprobacions/5
        [ResponseType(typeof(SolicitudyAprobacion))]
        public IHttpActionResult GetSolicitudyAprobacion(int id)
        {
            SolicitudyAprobacion solicitudyAprobacion = db.SolicitudyAprobacion.Find(id);
            if (solicitudyAprobacion == null)
            {
                return NotFound();
            }

            return Ok(solicitudyAprobacion);
        }

        // PUT: api/SolicitudyAprobacions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSolicitudyAprobacion(int id, SolicitudyAprobacion solicitudyAprobacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != solicitudyAprobacion.Id)
            {
                return BadRequest();
            }

            db.Entry(solicitudyAprobacion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitudyAprobacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SolicitudyAprobacions
        [ResponseType(typeof(SolicitudyAprobacion))]
        public IHttpActionResult PostSolicitudyAprobacion(SolicitudyAprobacion solicitudyAprobacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SolicitudyAprobacion.Add(solicitudyAprobacion);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = solicitudyAprobacion.Id }, solicitudyAprobacion);
        }

        // DELETE: api/SolicitudyAprobacions/5
        [ResponseType(typeof(SolicitudyAprobacion))]
        public IHttpActionResult DeleteSolicitudyAprobacion(int id)
        {
            SolicitudyAprobacion solicitudyAprobacion = db.SolicitudyAprobacion.Find(id);
            if (solicitudyAprobacion == null)
            {
                return NotFound();
            }

            db.SolicitudyAprobacion.Remove(solicitudyAprobacion);
            db.SaveChanges();

            return Ok(solicitudyAprobacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SolicitudyAprobacionExists(int id)
        {
            return db.SolicitudyAprobacion.Count(e => e.Id == id) > 0;
        }
    }
}