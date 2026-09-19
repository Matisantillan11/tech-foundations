const badge = (label) =>
	`<span class="rounded-[4px] border border-solid border-line bg-paper px-[10px] py-[5px] font-code text-[12px] text-blue">${label}</span>`
const button =
	'inline-flex items-center justify-center gap-[12px] rounded-[4px] border border-solid border-[#b7c6d2] bg-transparent px-[16px] py-[11px] text-[13px] [&:hover:not(:disabled)]:bg-soft'

// Inline SVG keeps the illustrations crisp, local and easy to animate with Tailwind.
const runner = `
  <svg id="runner-scene" data-gait="walk" viewBox="0 0 320 185" role="img" aria-label="Una persona camina a 4 kilómetros por hora"
    class="block h-[155px] w-full overflow-hidden compact:h-[125px] mobile:h-[150px] [--gait-duration:1.2s] [--stride:20deg] [--knee:25deg] [--elbow:18deg] [--bounce:2px] [--lean:0deg] data-[gait=trot]:[--gait-duration:0.75s] data-[gait=trot]:[--stride:32deg] data-[gait=trot]:[--knee:55deg] data-[gait=trot]:[--elbow:65deg] data-[gait=trot]:[--bounce:5px] data-[gait=trot]:[--lean:5deg] data-[gait=run]:[--gait-duration:0.48s] data-[gait=run]:[--stride:45deg] data-[gait=run]:[--knee:80deg] data-[gait=run]:[--elbow:85deg] data-[gait=run]:[--bounce:8px] data-[gait=run]:[--lean:9deg] data-[gait=sprint]:[--gait-duration:0.36s] data-[gait=sprint]:[--stride:45deg] data-[gait=sprint]:[--knee:80deg] data-[gait=sprint]:[--elbow:85deg] data-[gait=sprint]:[--bounce:9px] data-[gait=sprint]:[--lean:10deg]">
    <path d="M16 170H304" fill="none" stroke="#c0cfdb" stroke-width="2" />
    <g class="animate-track-scroll" fill="none" stroke="#9aafbf" stroke-width="2" stroke-linecap="round">
      <path d="M0 178h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10m22 0h10" />
    </g>
    <ellipse cx="150" cy="168" rx="33" ry="4" fill="#c5d4df" opacity=".5" />
    <g class="animate-person-bob">
      <g class="[transform-origin:145px_116px] [transform:rotate(var(--lean))]">
        <g stroke-linecap="round" stroke-linejoin="round" fill="none">
          <g class="animate-person-stride [transform-origin:145px_115px] [animation-delay:calc(var(--gait-duration)*-0.5)]" stroke="#8098ad" stroke-width="12">
            <path d="M145 115v26" />
            <g class="animate-person-knee [transform-origin:145px_141px] [animation-delay:calc(var(--gait-duration)*-0.5)]"><path d="M145 141v22h9" /></g>
          </g>
          <g class="animate-person-stride [transform-origin:145px_73px]" stroke="#9aafbf" stroke-width="9">
            <path d="M145 73v24" />
            <path d="M145 97v22" class="[transform-origin:145px_97px] [transform:rotate(calc(var(--elbow)*-1))]" />
          </g>
          <path d="M145 68v43" stroke="#cf702e" stroke-width="20" />
          <path d="M145 109v8" stroke="#304968" stroke-width="15" />
          <g class="animate-person-stride [transform-origin:145px_115px]" stroke="#304968" stroke-width="12">
            <path d="M145 115v26" />
            <g class="animate-person-knee [transform-origin:145px_141px]"><path d="M145 141v22h10" /></g>
          </g>
          <g class="animate-person-stride [transform-origin:145px_73px] [animation-delay:calc(var(--gait-duration)*-0.5)]" stroke="#304968" stroke-width="9">
            <path d="M145 73v24" />
            <path d="M145 97v22" class="[transform-origin:145px_97px] [transform:rotate(calc(var(--elbow)*-1))]" />
          </g>
        </g>
        <path d="M145 53v12" stroke="#d9a77d" stroke-width="10" stroke-linecap="round" />
        <circle cx="147" cy="42" r="14" fill="#ddb18c" />
        <path d="M133 42c-3-19 22-23 27-7l-12-2-5 10z" fill="#304968" />
        <circle cx="154" cy="42" r="1.5" fill="#304968" />
      </g>
    </g>
  </svg>`

const tree = `
  <svg viewBox="0 0 320 185" role="img" aria-label="Un árbol deja caer una manzana repetidamente con la misma gravedad"
    class="block h-[155px] w-full compact:h-[125px] mobile:h-[150px]">
    <path d="M16 170H304" stroke="#c9d1c6" stroke-width="2" />
    <ellipse cx="158" cy="169" rx="55" ry="5" fill="#d7ddd2" />
    <path d="M144 165l9-109h17l9 109z" fill="#a5876b" />
    <path d="M162 99l-26-33m29 18l25-29" fill="none" stroke="#a5876b" stroke-width="11" stroke-linecap="round" />
    <path d="M100 78c-20-21-1-46 20-44 2-27 39-37 55-15 23-10 44 4 45 25 25 5 32 33 11 48-19 17-45 14-59 5-28 18-56 5-72-19z" fill="#8aa69c" />
    <path d="M112 51c8-17 27-21 39-15m28-5c14-1 26 9 26 20" fill="none" stroke="#b0c3b5" stroke-width="5" stroke-linecap="round" />
    <circle cx="128" cy="68" r="5" fill="#c58050" />
    <circle cx="177" cy="45" r="5" fill="#c58050" />
    <g id="falling-apple" class="animate-apple-fall">
      <path d="M212 53q-1-6 3-9" fill="none" stroke="#715a40" stroke-width="2.5" stroke-linecap="round" />
      <path d="M214 49q3-8 10-5-1 7-10 5" fill="#4e7261" />
      <path d="M213 55c-12-9-17 8-8 14 4 3 6 0 8 0s5 3 8 0c9-7 4-22-8-14" fill="#cf702e" />
      <path d="M206 57q-3 2-2 6" fill="none" stroke="#efbd89" stroke-width="2" stroke-linecap="round" />
    </g>
  </svg>`

export const physicsSlide = {
	title: 'Velocidad y gravedad.',
	chapter: '01 · Variables y constantes',
	source: [7, 8],
	summary: 'La velocidad cambia con let. La gravedad se mantiene en 9,81 m/s² con const en este modelo.',
	html: `
    <p class="eyebrow text-[11px] tracking-[2.4px] font-bold text-muted leading-[1.5] mobile:text-[9px] mobile:tracking-[1.6px]">01 / VARIABLES Y CONSTANTES</p>
    <h2>Una cambia.<br><span>La otra se mantiene.</span></h2>
    <div class="grid grid-cols-2 gap-[24px] mobile:grid-cols-1 mobile:gap-[20px]">
      <article class="rounded-[8px] border border-solid border-[#d5e0ea] bg-[#edf3f8] p-[20px] compact:p-[16px]">
        <div class="flex items-center justify-between gap-[12px]">
          <div><p class="text-[10px] tracking-[1.5px] text-muted">VARIABLE</p><h3 class="mt-[4px] text-[23px]">Velocidad</h3></div>${badge('let')}
        </div>
        ${runner}
        <div class="flex items-baseline justify-between gap-[12px]">
          <p class="leading-[1.1]"><span id="variable-value" class="inline-block text-[35px] tabular-nums text-blue">4</span> <span class="text-[13px] text-muted">km/h</span></p>
          <span id="speed-state" class="text-[13px] text-blue">Caminando</span>
        </div>
        <p class="mt-[12px] font-code text-[13px] text-blue">let velocidad = <span id="speed-code">4</span>;</p>
        <div class="mt-[16px] flex items-center gap-[14px]">
          <button id="increase-speed" class="${button}" data-action="variable">Aumentar velocidad <span aria-hidden="true">+</span></button>
          <button class="border-0 bg-transparent p-[8px] text-[12px] text-muted [&:hover]:text-blue" data-action="reset-speed" aria-label="Reiniciar la velocidad a 4 kilómetros por hora">Reiniciar</button>
        </div>
      </article>
      <article class="rounded-[8px] border border-solid border-[#e0d8cc] bg-[#f5f0e8] p-[20px] compact:p-[16px]">
        <div class="flex items-center justify-between gap-[12px]">
          <div><p class="text-[10px] tracking-[1.5px] text-muted">CONSTANTE</p><h3 class="mt-[4px] text-[23px]">Gravedad</h3></div>${badge('const')}
        </div>
        ${tree}
        <div class="flex items-baseline justify-between gap-[12px]">
          <p class="leading-[1.1]"><span id="constant-value" class="inline-block text-[35px] tabular-nums text-blue">9,81</span> <span class="text-[13px] text-muted">m/s²</span></p>
          <span class="text-[13px] text-blue">Siempre igual aquí</span>
        </div>
        <p class="mt-[12px] font-code text-[13px] text-blue">const gravedad = 9.81;</p>
        <div class="mt-[16px] flex items-center">
          <button class="${button}" data-action="constant">Intentar cambiar gravedad <span aria-hidden="true">↗</span></button>
        </div>
      </article>
    </div>
    <div>
      <p id="variable-feedback" class="min-h-[24px] text-[14px] text-blue" aria-live="polite">Aumentá la velocidad: de caminar a trotar y correr. ¿Podés cambiar la gravedad?</p>
    </div>`,
}
