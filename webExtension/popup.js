window.onload = () => {
    let changeColor = document.getElementById( "changeColor" );

    changeColor.addEventListener( "click", async () => {
        let [ tab ] = await chrome.tabs.query( { active: true, currentWindow: true } );

        chrome.scripting.executeScript( {
            target: { tabId: tab.id },
            function: showPanel,
        } );
    } );
}


const showPanel = () => {
        const getInputElement = document.querySelector( '.bet365ParserRoot' );
        const style = window.getComputedStyle( getInputElement )

        if ( style.display === "grid" ) {
            getInputElement.style.display = "none";
        } else {
            getInputElement.style.display = "grid";
        }
}
