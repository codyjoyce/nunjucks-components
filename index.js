const nunjucks = require("nunjucks");

module.exports = function Components(env) {

    this.tags = ['component'];

    this.parse = function (parser, nodes) {

        const token = parser.nextToken();
        const args = parser.parseSignature(null, true);

        parser.advanceAfterBlockEnd(token.value);
        const bodyNode = parser.parseUntilBlocks('endcomponent');
        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'run', args, [bodyNode]);
    };

    this.run = function (en, filename) {
        if (arguments.length < 2)
            return console.error("You need to specify a file for the component");

        let props;
        const body = arguments[arguments.length - 1];

        if (arguments.length > 3) {
            props = arguments[arguments.length - 2];
        }

        let component = env.render(filename, props);
        component = component.replace(/<slot>[\s\S]*?<\/slot>/g, body());

        return new nunjucks.runtime.SafeString(component);
    };
}