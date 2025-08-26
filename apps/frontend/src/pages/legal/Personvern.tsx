import React from 'react';

const Personvern: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Personvernpolitikk
            </h1>
            <p className="text-responsive-body text-charcoal/70">
              Sist oppdatert: {new Date().toLocaleDateString('no-NO')}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white organic-border minimal-shadow card-inner prose prose-lg max-w-none">
            
            <h2>1. Innledning</h2>
            <p>
              Helseriet Norge AS ("vi", "oss", "vår") respekterer ditt personvern og er forpliktet til å beskytte 
              dine personopplysninger. Denne personvernpolitikken forklarer hvordan vi samler inn, bruker, 
              deler og beskytter informasjonen din når du bruker våre tjenester.
            </p>

            <h2>2. Informasjon vi samler inn</h2>
            
            <h3>2.1 Informasjon du gir oss direkte</h3>
            <ul>
              <li>Navn, e-postadresse og telefonnummer ved kontoopprettelse</li>
              <li>Leveringsadresse og faktureringsinformasjon</li>
              <li>Betalingsinformasjon (behandles sikkert av våre betalingsleverandører)</li>
              <li>Kommunikasjon med kundeservice</li>
              <li>Anmeldelser og kommentarer på produkter</li>
            </ul>

            <h3>2.2 Informasjon vi samler automatisk</h3>
            <ul>
              <li>IP-adresse og enhetsinformasjon</li>
              <li>Nettleseropplysninger og operativsystem</li>
              <li>Besøksmønstre og navigasjonsdata på nettstedet</li>
              <li>Cookies og lignende teknologier</li>
            </ul>

            <h2>3. Hvordan vi bruker informasjonen din</h2>
            <p>Vi bruker dine personopplysninger til å:</p>
            <ul>
              <li>Behandle og levere bestillinger</li>
              <li>Administrere kundekonto og gi kundeservice</li>
              <li>Sende viktig informasjon om bestillinger og kontoen din</li>
              <li>Forbedre nettstedet og brukeropplevelsen</li>
              <li>Sende markedsføring (kun med ditt samtykke)</li>
              <li>Overholde juridiske forpliktelser</li>
            </ul>

            <h2>4. Juridisk grunnlag for behandling</h2>
            <p>Vi behandler dine personopplysninger basert på:</p>
            <ul>
              <li><strong>Kontrakt:</strong> For å oppfylle kjøpsavtaler og levere produkter</li>
              <li><strong>Berettiget interesse:</strong> For å forbedre tjenestene våre og forhindre svindel</li>
              <li><strong>Samtykke:</strong> For markedsføring og ikke-nødvendig bruk av cookies</li>
              <li><strong>Juridisk forpliktelse:</strong> For å overholde regnskaps- og skattelover</li>
            </ul>

            <h2>5. Deling av informasjon</h2>
            <p>Vi deler ikke dine personopplysninger med tredjeparter, unntatt:</p>
            <ul>
              <li><strong>Leverandører:</strong> For å behandle bestillinger og levere produkter</li>
              <li><strong>Betalingsleverandører:</strong> For sikker behandling av betalinger</li>
              <li><strong>Teknologileverandører:</strong> Som hjelper oss med å drive nettstedet</li>
              <li><strong>Juridiske krav:</strong> Når loven krever det</li>
            </ul>

            <h2>6. Internasjonale overføringer</h2>
            <p>
              Noen av våre tjenesteleverandører kan være lokalisert utenfor EU/EØS. 
              Vi sørger for at slike overføringer skjer i henhold til GDPR-kravene 
              gjennom passende beskyttelsestiltak.
            </p>

            <h2>7. Datasikkerhet</h2>
            <p>
              Vi implementerer passende tekniske og organisatoriske tiltak for å beskytte 
              dine personopplysninger mot tap, misbruk, uautorisert tilgang eller endring. 
              Dette inkluderer:
            </p>
            <ul>
              <li>SSL-kryptering for all dataoverføring</li>
              <li>Sikre servere med begrenset tilgang</li>
              <li>Regelmessige sikkerhetsvurderinger</li>
              <li>Opplæring av ansatte i datasikkerhet</li>
            </ul>

            <h2>8. Lagringsperioder</h2>
            <p>Vi lagrer dine personopplysninger så lenge det er nødvendig for:</p>
            <ul>
              <li>Aktive kontoer: Så lenge kontoen er aktiv</li>
              <li>Bestillingsinformasjon: 5 år etter kjøp (regnskapsloven)</li>
              <li>Markedsføring: Til du trekker tilbake samtykket</li>
              <li>Sikkerhetshensyn: 3 år for å oppdage svindel</li>
            </ul>

            <h2>9. Dine rettigheter</h2>
            <p>Under GDPR har du rett til å:</p>
            <ul>
              <li><strong>Tilgang:</strong> Be om en kopi av dine personopplysninger</li>
              <li><strong>Retting:</strong> Korrigere unøyaktige eller utdaterte opplysninger</li>
              <li><strong>Sletting:</strong> Be om sletting av dine personopplysninger</li>
              <li><strong>Begrensning:</strong> Begrense behandlingen i visse tilfeller</li>
              <li><strong>Dataportabilitet:</strong> Motta dine data i et strukturert format</li>
              <li><strong>Innsigelse:</strong> Motsette deg behandling basert på berettiget interesse</li>
              <li><strong>Tilbaketrekking:</strong> Trekke tilbake samtykke når som helst</li>
            </ul>

            <h2>10. Cookies</h2>
            <p>
              Vi bruker cookies og lignende teknologier for å forbedre din opplevelse på nettstedet. 
              Du kan administrere cookie-innstillingene dine i nettleseren eller gjennom vårt 
              cookie-samtykke-verktøy.
            </p>

            <h2>11. Barn</h2>
            <p>
              Våre tjenester er ikke rettet mot barn under 16 år. Vi samler ikke bevisst inn 
              personopplysninger fra barn under 16 år uten foreldres samtykke.
            </p>

            <h2>12. Endringer i personvernpolitikken</h2>
            <p>
              Vi kan oppdatere denne personvernpolitikken fra tid til annen. Vesentlige endringer 
              vil bli kommunisert via e-post eller tydelige varsler på nettstedet.
            </p>

            <h2>13. Kontakt oss</h2>
            <p>
              Hvis du har spørsmål om denne personvernpolitikken eller ønsker å utøve dine rettigheter, 
              kan du kontakte oss:
            </p>
            <div className="bg-sage/10 p-4 rounded-2xl">
              <p><strong>Helseriet Norge AS</strong><br />
              E-post: personvern@helseriet.no<br />
              Telefon: +47 123 45 678<br />
              Adresse: [Firmaadresse]<br />
              Org.nr: [Organisasjonsnummer]</p>
            </div>

            <h2>14. Klagerett</h2>
            <p>
              Du har rett til å klage til Datatilsynet hvis du mener vi behandler dine 
              personopplysninger i strid med personvernlovgivningen.
            </p>
            <div className="bg-stone_light/50 p-4 rounded-2xl">
              <p><strong>Datatilsynet</strong><br />
              Postboks 458 Sentrum<br />
              0105 Oslo<br />
              Telefon: 22 39 69 00<br />
              E-post: postkasse@datatilsynet.no</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Personvern;