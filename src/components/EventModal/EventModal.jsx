import Modal from "../Modal/Modal.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import VenueMap from "../VenueMap/VenueMap.jsx";
import { useBrand, useCopy, useCountry, useNav } from "../../content/ContentProvider.jsx";
import { longDate, programmeOf } from "../../lib/events.js";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";

const LABEL =
  "mb-[0.9rem] block text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted";

export default function EventModal({ event: card, onClose }) {
  const BRAND = useBrand();
  const copy = useCopy().eventModal;
  const eventsCopy = useCopy().events;
  const [country] = useCountry();
  const { pages } = useNav();

  /* ⚠ This modal shows `details`, `agenda` and `address`, and NONE of them are
     in the homepage's card. Listings carry card fields only — that split is
     what keeps the first payload bounded however many events exist — so the
     full record is fetched here, when someone actually opens one.

     Fetching on a deliberate click is the cheapest possible place to pay for
     it, and GSAP is not involved: the modal animates with its own keyframes
     (`animate-ecardIn`), not with a `.reveal` pass. */
  const { data, loading } = useCms(`/api/events/${card.id}`, {
    enabled: CMS_ENABLED,
  });

  /* The card is already on screen, so it renders straight away and the detail
     fields fill in underneath. */
  const event = { ...card, ...(data ?? {}) };

  const programme = programmeOf(event, pages);

  return (
    <Modal
      onClose={onClose}
      labelledBy="emodal-title"
      /* the generic close button sits on this modal's dark header */
      /* `!` because Tailwind orders utilities by property, not by the order
         they appear — the shared CLOSE's own text colour would win */
      closeClassName="!text-white/70 hover:!text-accent"
    >
      <div className="bg-primary-800 p-[clamp(1.4rem,4vw,2.2rem)] py-[1.8rem] pr-[4.5rem]">
        <div className="mb-[0.7rem] flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-accent">
            {longDate(event.date, country.locale)}
          </span>
          <span className="rounded-full bg-white/[0.14] px-[0.6rem] py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/85">
            {programme ? programme.label : eventsCopy.community}
          </span>
        </div>
        <h3
          id="emodal-title"
          className="mb-2 text-[clamp(24px,4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
        >
          {event.title}
        </h3>
        <p className="text-[15px] font-medium text-white/70">
          {event.start}–{event.end} · {event.kind} · {event.spots} places
        </p>
      </div>

      <div className="flex flex-col gap-[1.9rem] p-[clamp(1.4rem,4vw,2.2rem)]">
        {event.details ? (
          <p className="text-[17px] leading-[27px] text-muted">{event.details}</p>
        ) : loading ? (
          <span aria-hidden="true" className="flex flex-col gap-2.5">
            {[96, 88, 70].map((w) => (
              <span
                key={w}
                style={{ width: `${w}%` }}
                className="h-4 animate-pulse rounded bg-mist"
              />
            ))}
          </span>
        ) : null}

        <div className="flex flex-wrap gap-[1.9rem] max-phone:gap-[1.4rem]">
          <div className="flex-[1_1_280px]">
            <span className={LABEL}>{copy.runsHeading}</span>
            {/* ⚠ `?.` is load-bearing, not defensive habit. The modal opens on
                the homepage CARD, which carries no agenda — the running order
                arrives a moment later with the full record. Mapping over it
                unguarded crashed the whole page on every open. */}
            {event.agenda?.map(([t, label]) => (
              <div className="mb-3 flex items-baseline gap-[0.9rem]" key={t}>
                <span className="w-[58px] flex-none text-[13px] font-extrabold text-primary">
                  {t}
                </span>
                <p className="text-[15px] leading-[22px]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-[1_1_240px] flex-col">
            <span className={LABEL}>{copy.whereLabel}</span>

            <VenueMap
              event={event}
              fallback={BRAND.address}
              copy={{ mapTitle: copy.mapTitle, directions: copy.directions }}
              size="compact"
            />
          </div>
        </div>

        <div className="border-t border-line pt-[1.6rem]">
          <RegisterForm event={event} locale={country.locale} />
        </div>
      </div>
    </Modal>
  );
}
