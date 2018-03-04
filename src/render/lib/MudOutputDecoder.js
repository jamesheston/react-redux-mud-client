export default class MudOutputDecoder {
  static mudOutputToHtml(input) {
    let output = input
    /*
    is this ANSI or XML? I need to write a function to check for
    this later. Assuming XML for now.
    */
    const isXml = true
    if( isXml ) {
      output = this.xmlToHtml(output)
    } else {
      output = this.ansiToHtml(output)
    }

    return output
  }

  static xmlToHtml(input) {
    // little modification is required when the data from the MUME server
    // is in XML mode, because the browser can render it as HTML.
    // all we have to do is replace the color codes with tags
    // that the browser can color
    let output = input
    output = this.renderAnsiCodes(output)
    output = this.removeArtifactsSetA(output)
    return output
  } 

  static removeArtifactsSetA(input) {
    let output = input

    output = output.replace(/��/g, '')
    output = output.replace(//g, '')
    output = output.replace(//g, '')
    output = output.replace(//g, '')
    output = output.replace(//g, '')

    return output
  }

  static renderAnsiCodes(input) {
    const ansiCodes = this.ansiCodes()
    let output = input
    // replace < and > with &gt; and &lt;
    let spanCount = 0
    // loop through every ansi code and do a search and replace

    // EXAMPLE
    // [1mPlayers[0m
    //
    // STEP 0 - example start
    // """ [1mPlayers[0m
    //
    // STEP 1 - for each ansiCode, run output.replace(/key/g)
    // """ <span class="bold">Players<span class="off">
    //
    // STEP 2 - keep a count of # of spans injected during state 1.
    //   - then append that many "</span>"s to output
    // """ <span class="bold">Players<span class="off"></span></span>
    for(const code in ansiCodes) {
      if( ansiCodes.hasOwnProperty(code) ){
        const codeRegex = new RegExp(code, 'g')
        if( codeRegex.test(input) ) {
          spanCount++
          const color = ansiCodes[code]
          output = output.replace(codeRegex, '<span class="' + color + '">' )
        }
      }
    }
    const a = '</span>'.repeat(spanCount)
    output += a
    return output
  }


  static ansiCodes() {
    return {
      // text style attributes
      '\\[0m'  : 'off',
      '\\[1m'  : 'bold background_transparent',
      '\\[4m'  : 'underline background_transparent',
      // foreground colors - dark
      '\\[30m' : 'black background_transparent',
      '\\[31m' : 'red background_transparent',
      '\\[32m' : 'green background_transparent',
      '\\[33m' : 'yellow background_transparent',
      '\\[34m' : 'blue background_transparent',
      '\\[35m' : 'magenta background_transparent',
      '\\[36m' : 'cyan background_transparent',
      '\\[37m' : 'white background_transparent',
      // foreground colors - bright
      '\\[90m' : 'bright_black background_transparent',
      '\\[91m' : 'bright_red background_transparent',
      '\\[92m' : 'bright_green background_transparent',
      '\\[93m' : 'bright_yellow background_transparent',
      '\\[94m' : 'bright_blue background_transparent',
      '\\[95m' : 'bright_magenta background_transparent',
      '\\[96m' : 'bright_cyan background_transparent',
      '\\[97m' : 'bright_white background_transparent',
      // bold + dark colors
      '\\[30;1m' : 'bold black background_transparent',
      '\\[31;1m' : 'bold red background_transparent',
      '\\[32;1m' : 'bold green background_transparent',
      '\\[33;1m' : 'bold yellow background_transparent',
      '\\[34;1m' : 'bold blue background_transparent',
      '\\[35;1m' : 'bold magenta background_transparent',
      '\\[36;1m' : 'bold cyan background_transparent',
      '\\[37;1m' : 'bold white background_transparent',
      // bold + bright colors
      '\\[90;1m' : 'bold bright_black background_transparent',
      '\\[91;1m' : 'bold bright_red background_transparent',
      '\\[92;1m' : 'bold bright_green background_transparent',
      '\\[93;1m' : 'bold bright_yellow background_transparent',
      '\\[94;1m' : 'bold bright_blue background_transparent',
      '\\[95;1m' : 'bold bright_magenta background_transparent',
      '\\[96;1m' : 'bold bright_cyan background_transparent',
      '\\[97;1m' : 'bold bright_white background_transparent',
      // unsorted
      '\\[97;44;1m' : 'bold bright_white background_blue',
      '\\[0;31m' : 'bold red background_transparent',
      '\\[37;44m' : 'white background_blue',
    }
  }  
}