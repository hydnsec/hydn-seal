import { CanvasRenderingContext2D, createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'

registerFont(`${__dirname}/assets/TitilliumWeb-Bold.ttf`, { family: 'TitilliumWeb' })

function fillTextWithSpacing(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
  const letters = text.split('')
  let currentX = x - ctx.measureText(text).width / 2 - (letters.length * spacing) / 2
  letters.forEach((letter) => {
    const width = ctx.measureText(letter).width
    ctx.fillText(letter, currentX + width / 2, y)
    currentX += width + spacing
  })
}

export async function sealGenerator(text: string): Promise<string> {
  const canvas = createCanvas(860, 860)
  const ctx = canvas.getContext('2d')

  const image = await loadImage(__dirname + '/assets/hydnSealBase.png')
  ctx.drawImage(image, 0, 0, 860, 860)

  ctx.textAlign = 'center'
  ctx.font = '47px TitilliumWeb'
  ctx.fillStyle = '#e9e7e6'
  fillTextWithSpacing(ctx, text, 440, 720, 5)
  const stream = canvas.createPNGStream()

  const filePath = `/tmp/audit_${Date.now()}.png`
  // const filePath = `${__dirname}/assets/audit_${Date.now()}.png` // TEST local

  const out = fs.createWriteStream(filePath)
  stream.pipe(out)

  return new Promise((resolve) => {
    out.on('finish', () => {
      console.log('Seal PNG file was created.')
      resolve(filePath)
    })
  })
}
