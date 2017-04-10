(function() {
    var cs = document.currentScript
        , doc = cs.ownerDocument
        ;

    customElements.define("big-red-button",
        class extends HTMLElement {
            constructor() {
                super();
                const
                    template = doc
                        .getElementById('brb-tmpl')
                        .content
                    , clone = template.cloneNode(true)
                    ;

                this._div = clone.querySelector("div.brb");
                this._size = 100;
                this.attachShadow({mode: 'open'})
                    .appendChild(clone);
            }
            get size() {
                return this._size;
            }
            set size(val) {
                var s = this._size = parseInt(val || "100", 10)
                    , st = this._div.style
                    ;

                st.width = s + "px";
                st.height = s + "px";
                st["border-radius"] = Math.floor(s / 2) + "px";
                st["font-size"] = Math.floor(s / 3) + "px";
                st["line-height"] = Math.floor(s / 2) + "px";
            }
            connectedCallback() {
                this.size = this.getAttribute("size") || 100;
            }
            static get observedAttributes() { return [ "size" ]; }
            attributeChangedCallback(name, oldValue, newValue) {
                switch (name) {
                    case "size":
                        this.size = newValue;
                        break;
                }
            }
        }
    );
}());
