import { formspreeId, formsEnabled } from '@/app/lib/constants';
import type { Translation } from '@/app/lib/translations';

type Props = {
  copy: Translation['contact']['form'];
};

export const ContactForm = ({ copy }: Props) => {
  const canSubmit = formsEnabled && Boolean(formspreeId);

  return (
    <form
      className='glass-panel mt-6 space-y-4 p-6 md:p-8'
      action={canSubmit ? `https://formspree.io/f/${formspreeId}` : undefined}
      method={canSubmit ? 'POST' : undefined}
    >
      <div className='grid gap-4 sm:grid-cols-2'>
        <label className='space-y-2 text-sm text-white/70'>
          <span>{copy.nameLabel}</span>
          <input
            type='text'
            name='name'
            placeholder={copy.namePlaceholder}
            required={canSubmit}
            className='w-full rounded-xl border border-white/12 bg-[var(--panel)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40'
          />
        </label>
        <label className='space-y-2 text-sm text-white/70'>
          <span>{copy.emailLabel}</span>
          <input
            type='email'
            name='email'
            placeholder={copy.emailPlaceholder}
            required={canSubmit}
            className='w-full rounded-xl border border-white/12 bg-[var(--panel)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40'
          />
        </label>
      </div>
      <label className='space-y-2 text-sm text-white/70'>
        <span>{copy.messageLabel}</span>
        <textarea
          rows={4}
          name='message'
          placeholder={copy.messagePlaceholder}
          required={canSubmit}
          className='w-full resize-none rounded-xl border border-white/12 bg-[var(--panel)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40'
        />
      </label>
      {!canSubmit && (
        <p className='rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-xs text-amber-100'>
          Formulário desativado no ambiente de homologação. Ative somente com um Formspree exclusivo para testes.
        </p>
      )}
      <button
        type={canSubmit ? 'submit' : 'button'}
        disabled={!canSubmit}
        className='inline-flex w-full items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#0c1116] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {copy.submit}
      </button>
    </form>
  );
};
